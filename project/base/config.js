import nconf from 'nconf';
import path from 'path';
import fs from 'fs';

const configDir = process.env.CONFIG_DIR || process.cwd();

const configJson = path.join(configDir, 'config.json');
nconf.file(configJson);

// Loading from file if exists
const config = nconf.get();

// serializing config
config.save = () => {
    fs.writeFileSync(configJson, JSON.stringify(config));
};

// Costumize configurations here

// DATABASE_CONFIG

export default config;
