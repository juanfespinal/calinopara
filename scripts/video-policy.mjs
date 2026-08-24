export const MAX_VIDEO_BYTES = 20 * 1024 * 1024;
export const TARGET_WIDTH = 720;
export const TARGET_HEIGHT = 1280;
export const TARGET_FPS = 30;

export function hasFastStart(buffer) {
  let offset = 0;
  let moovOffset = -1;
  let mdatOffset = -1;

  while (offset + 8 <= buffer.length) {
    const atomSize = buffer.readUInt32BE(offset);
    const atomType = buffer.toString("ascii", offset + 4, offset + 8);
    const headerSize = atomSize === 1 ? 16 : 8;
    const size = atomSize === 1 ? Number(buffer.readBigUInt64BE(offset + 8)) : atomSize;

    if (size < headerSize || offset + size > buffer.length) return false;
    if (atomType === "moov") moovOffset = offset;
    if (atomType === "mdat") mdatOffset = offset;
    offset += size;
  }

  return moovOffset >= 0 && mdatOffset >= 0 && moovOffset < mdatOffset;
}

export function isEfficientVideo(video) {
  return describeVideoIssues(video).length === 0;
}

export function describeVideoIssues(video) {
  const issues = [];

  if (video.size > MAX_VIDEO_BYTES) {
    issues.push(`pesa ${(video.size / 1024 / 1024).toFixed(1)} MB; máximo ${MAX_VIDEO_BYTES / 1024 / 1024} MB`);
  }
  if (video.videoCodec !== "h264") {
    issues.push(`video codec ${video.videoCodec ?? "desconocido"}; se requiere h264`);
  }
  if (video.audioCodec !== "aac") {
    issues.push(`audio codec ${video.audioCodec ?? "desconocido"}; se requiere aac`);
  }
  if (video.width !== TARGET_WIDTH || video.height !== TARGET_HEIGHT) {
    issues.push(`dimensiones ${video.width ?? "?"}x${video.height ?? "?"}; se requiere ${TARGET_WIDTH}x${TARGET_HEIGHT}`);
  }
  if (Math.abs(video.fps - TARGET_FPS) > 0.01) {
    issues.push(`fps ${video.fps ?? "desconocido"}; se requiere ${TARGET_FPS}`);
  }
  if (video.fastStart !== true) {
    issues.push("el átomo moov no está al inicio (falta faststart)");
  }

  return issues;
}
