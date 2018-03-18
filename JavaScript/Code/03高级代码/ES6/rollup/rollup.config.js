import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
    entry: 'src/index.js',  
    output: {
        file: 'build/bundle.js',
        format: 'umd'
    },       
    plugins: [
        resolve(),          
        babel({             
            exclude: 'node_modules/**' 
        })
    ]
}
