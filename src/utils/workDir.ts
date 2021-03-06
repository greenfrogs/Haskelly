import { execSync } from 'child_process';
import { dirname, resolve } from 'path';

export function getWorkDir(filepath) {
     try {
        const path = execSync("stack query", { cwd: dirname(filepath) }).toString();
        const re = /.*\spath:\s*(.*?)\s*?\n/
        var extract = re.exec(path)[1];

        // Windows
        if (/^win/.test(process.platform)) {
            extract = extract.replace(/\\/g, "/");
            // Windows also include the drive 
            // extract = extract.slice(2, extract.length);
        }

        return { cwd: extract };
    } catch (e) {
        return {};
    }
}