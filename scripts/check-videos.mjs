import { readdir, readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import {
  describeVideoIssues,
  hasFastStart,
  TARGET_FPS,
  TARGET_HEIGHT,
  TARGET_WIDTH,
} from "./video-policy.mjs";

const videosDir = new URL("../public/videos/", import.meta.url);
const entries = (await readdir(videosDir, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".mp4"))
  .sort((a, b) => a.name.localeCompare(b.name));

if (entries.length === 0) {
  console.log("No hay videos locales para validar.");
  process.exit(0);
}

const errors = [];

function parseFps(rate) {
  const [numerator, denominator] = String(rate).split("/").map(Number);
  return denominator ? numerator / denominator : numerator;
}

for (const entry of entries) {
  const filePath = new URL(entry.name, videosDir);
  const probe = spawnSync(
    "ffprobe",
    [
      "-v",
      "error",
      "-print_format",
      "json",
      "-show_entries",
      "format=size:stream=codec_type,codec_name,width,height,avg_frame_rate",
      filePath.pathname,
    ],
    { encoding: "utf8" },
  );

  if (probe.status !== 0) {
    errors.push(`${entry.name}: ffprobe no pudo leer el archivo`);
    continue;
  }

  const metadata = JSON.parse(probe.stdout);
  const video = metadata.streams?.find((stream) => stream.codec_type === "video");
  const audio = metadata.streams?.find((stream) => stream.codec_type === "audio");
  const fileBuffer = await readFile(filePath);
  const details = {
    size: Number(metadata.format?.size ?? fileBuffer.byteLength),
    videoCodec: video?.codec_name,
    audioCodec: audio?.codec_name,
    width: video?.width,
    height: video?.height,
    fps: parseFps(video?.avg_frame_rate ?? 0),
    fastStart: hasFastStart(fileBuffer),
  };
  const issues = describeVideoIssues(details);
  const displaySize = (details.size / 1024 / 1024).toFixed(1);
  console.log(`${entry.name}: ${displaySize} MB · ${details.width}x${details.height} · ${details.fps} fps`);
  for (const issue of issues) {
    errors.push(`${entry.name}: ${issue}`);
  }
}

if (errors.length > 0) {
  console.error("\nVideos inválidos:");
  for (const error of errors) console.error(`- ${error}`);
  console.error(`\nReencodea a ${TARGET_WIDTH}x${TARGET_HEIGHT}, ${TARGET_FPS} fps, H.264/AAC con -movflags +faststart.`);
  process.exit(1);
}

console.log("Todos los videos cumplen la política de medios.");
