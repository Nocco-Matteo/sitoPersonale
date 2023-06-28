const { Command } = require('commander');
const openai = require("../api/openai");

const program = new Command();

program.name('generate')
    .description('CLI to generate products.')
    .version('1.0.0');

program.command('image')
    .description('Generate an Image (using OpenAI\'s DALL·E API)')
    .argument('<prompt>', 'The prompt to generate the image from.')
    .option('--key', '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')
    .action(async (prompt, options) => {
        const base64Image = await openai.createImage(prompt, options.key);
        
        console.log(base64Image)
    });

program.parse()
