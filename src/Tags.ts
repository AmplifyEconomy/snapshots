import { LEGACY_TAGS, OUTPUT_TAGS } from './Config';
import { TransformTags } from './service/service.tags';

export async function Start() {
    console.log(`Parsing ${LEGACY_TAGS} to ${OUTPUT_TAGS}`.green.bold)
    await TransformTags(LEGACY_TAGS, OUTPUT_TAGS);
}

(async () => await Start())();
