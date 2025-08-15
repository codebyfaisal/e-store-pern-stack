import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, relative } from 'path';

const sourceDir = 'frontend/src';
const outputFile = 'combined_code.txt';

// Recursive function jo directory me maujood saari files ki list deti he.
function getFilesRecursively(dir) {
    let files = [];
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
            // Agar directory he to recursive call karein
            files = files.concat(getFilesRecursively(fullPath));
        } else {
            // Agar file he to list me shamil karein
            files.push(fullPath);
        }
    }
    return files;
}

function combineFiles() {
    try {
        console.log(`'${sourceDir}' directory se files jama ki ja rahi hain...`);
        
        // Saari files ki list lein
        const allFiles = getFilesRecursively(sourceDir);

        let combinedContent = '';

        // Har file ko loop karein aur uska content format ke sath add karein
        for (const filePath of allFiles) {
            const fileContent = readFileSync(filePath, 'utf-8');
            const relativePath = relative(process.cwd(), filePath);

            combinedContent += `// --- /${relativePath}\n`;
            combinedContent += fileContent;
            combinedContent += '\n\n-------------------------------------------------\n\n';
        }

        // Final content ko output file me likhein
        writeFileSync(outputFile, combinedContent);
        
        console.log(`✅ Tamam files ko '${outputFile}' me kamyabi se copy kar diya gaya he.`);

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(`Yakeen karein ki '${sourceDir}' directory maujood he.`);
    }
}

// Program ko chalayein
combineFiles();