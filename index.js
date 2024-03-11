import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {         //main introduction to the program
    console.log(colors.bold.blue('Welcome, I am Chitterbot, powered by ChatGPT!'));
    console.log(colors.bold.blue('You can start chatting with me.'));
    console.log(colors.bold.blue('To exit the program, please enter "exit".'));
    
    const chatHistory = [];     //store conversation history

    while (true){
        const userInput = readlineSync.question(colors.white('You: '));
        
        try {
            console.log(colors.bold.yellow('Thinking...'));
            //construct messages by iterating over the history
            const messages = chatHistory.map(([role, content]) => ({role, content}))

            //add latest user input
            messages.push({role: 'user', content: userInput });

            //call the API with user input
            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: messages,
            });
    
            //get completion text/content
            const completionText = (colors.bold.blue(completion.choices[0].message.content));
    
            if(userInput.toLowerCase() === 'exit'){
                console.log(colors.bold.blue('Chitterbot: ') + completionText);
                break;
            }
            console.log(colors.bold.blue('Chitterbot: ') + completionText);

            //update history with user input and assistant response
            chatHistory.push(['user', userInput]);
            chatHistory.push(['assistant', completionText]);
        } 
            //to catch errors
        catch (error) {
            console.error(colors.red(error));
        }
    }
}

main();
