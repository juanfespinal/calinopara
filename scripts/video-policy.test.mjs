import test from "node:test";
import assert from "node:assert/strict";
import { hasFastStart, isEfficientVideo } from "./video-policy.mjs";

const validVideo = {
  size: 19 * 1024 * 1024,
  videoCodec: "h264",
  audioCodec: "aac",
  width: 720,
  height: 1280,
  fps: 30,
  fastStart: true,
};

test("accepts a normalized vertical H.264/AAC reel under 20 MB", () => {
  assert.equal(isEfficientVideo(validVideo), true);
});

test("rejects a video over the recommended 20 MB limit", () => {
  assert.equal(isEfficientVideo({ ...validVideo, size: 21 * 1024 * 1024 }), false);
});

test("rejects a video with a non-web codec or wrong dimensions", () => {
  assert.equal(isEfficientVideo({ ...validVideo, videoCodec: "vp9" }), false);
  assert.equal(isEfficientVideo({ ...validVideo, width: 1080 }), false);
});

test("rejects a video that is not normalized to 30 fps with AAC audio", () => {
  assert.equal(isEfficientVideo({ ...validVideo, fps: 60 }), false);
  assert.equal(isEfficientVideo({ ...validVideo, audioCodec: "opus" }), false);
});

test("rejects a video whose metadata is not optimized for progressive playback", () => {
  assert.equal(isEfficientVideo({ ...validVideo, fastStart: false }), false);
});

test("detects top-level MP4 atom order instead of matching payload text", () => {
  const atom = (type, payload = Buffer.alloc(0)) => {
    const result = Buffer.alloc(8 + payload.length);
    result.writeUInt32BE(result.length, 0);
    result.write(type, 4, 4, "ascii");
    payload.copy(result, 8);
    return result;
  };

  assert.equal(hasFastStart(Buffer.concat([atom("ftyp"), atom("moov"), atom("mdat")])), true);
  assert.equal(hasFastStart(Buffer.concat([atom("ftyp"), atom("mdat"), atom("moov")])), false);
  assert.equal(hasFastStart(Buffer.concat([atom("ftyp"), atom("mdat", Buffer.from("moov"))])), false);
});
