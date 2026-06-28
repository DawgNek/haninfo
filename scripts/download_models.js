const fs = require('fs');
const path = require('path');
// Node 18+ has built-in fetch, but let's ensure we use it or require it if needed.
// Since we checked Node v20, we can use global fetch.

const models = [
    {
        name: 'kato',
        url: 'https://model.zulma.id/assets/models/Saekano/kato_M04/kato_M04.model.json',
        // The JSON content has paths like "common/..." so we need to be careful where we save the JSON.
        // If we save json to `kato/01.json`, "common/..." is `kato/common/...`.
        // The URL base is `https://model.zulma.id/assets/models/Saekano/kato/`
        filename: 'kato_M04.model.json'
    },
    {
        name: 'asuna',
        url: 'https://model.zulma.id/assets/models/SAO/asuna/asuna_01/asuna_01.model.json',
        filename: 'asuna_01.model.json'
    }
];

const downloadFile = async (url, destPath) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        const buffer = await response.arrayBuffer();
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        fs.writeFileSync(destPath, Buffer.from(buffer));
        console.log(`Downloaded: ${url} -> ${destPath}`);
        return true;
    } catch (error) {
        console.error(`Error downloading ${url}:`, error.message);
        return false;
    }
};

const processModel = async (model) => {
    const outputDir = path.join(__dirname, '../public/models', model.name);
    const jsonUrl = model.url;
    const baseUrl = jsonUrl.substring(0, jsonUrl.lastIndexOf('/') + 1);

    console.log(`Processing ${model.name}...`);

    // Download main JSON
    const jsonDest = path.join(outputDir, model.filename);
    const success = await downloadFile(jsonUrl, jsonDest);
    if (!success) return;

    // Read and parse JSON
    const jsonContent = JSON.parse(fs.readFileSync(jsonDest, 'utf-8'));
    const filesToDownload = [];

    // Helper to add files
    const add = (val) => {
        if (!val) return;
        if (typeof val === 'string') filesToDownload.push(val);
        else if (Array.isArray(val)) val.forEach(v => add(v));
        else if (val.file) filesToDownload.push(val.file); // common/mtn object format
    };

    // Extract paths from Live2D JSON structure
    // Model 2.0 / 3.0 fields
    add(jsonContent.model);
    add(jsonContent.textures);
    add(jsonContent.physics);
    add(jsonContent.pose);

    // Expressions
    if (jsonContent.expressions) {
        jsonContent.expressions.forEach(e => add(e.file));
    }

    // Motions
    if (jsonContent.motions) {
        Object.values(jsonContent.motions).forEach(motionGroup => {
            motionGroup.forEach(m => add(m.file));
        });
    }

    // Download references
    for (const relPath of filesToDownload) {
        const fileUrl = new URL(relPath, baseUrl).toString();
        const fileDest = path.join(outputDir, relPath);
        await downloadFile(fileUrl, fileDest);
    }
    console.log(`Finished ${model.name}`);
};

const main = async () => {
    for (const model of models) {
        await processModel(model);
    }
};

main();
