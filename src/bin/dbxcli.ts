import {program} from '@cli';
import {AsyncResultWrap, logAndAbort} from '@lib/utils';

(async() =>{

    const [_,error] = await AsyncResultWrap(async()=>{
        program.parseAsync(process.argv)
    })
    logAndAbort(error);

})()