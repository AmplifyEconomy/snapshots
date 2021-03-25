export function RemapLine(keys: Array<string>, map: Array<number>) {
    let remappedLine = ``;

    for (let i = 0; i < map.length; i++) {
        const index = map[i];
        if (i > 0) {
            remappedLine += `,`;
        }
        remappedLine += keys[index];
    }

    return remappedLine;
}