import {commandLoader, program} from '@cli';
import {AsyncResultWrap, logAndAbort} from '@lib/utils';

(async() =>{

    const [_,error] = await AsyncResultWrap(async()=>{
        await commandLoader(program);
        program.parseAsync(process.argv)
    })
    logAndAbort(error);

})()