import path from 'path'
import DataURIPARSER from 'datauri/parser.js'
export const getDataUri=(file)=>{
    const parser=new DataURIPARSER()
    const extName=path.extname(file.originalname).toString();
    return parser.format(extName,file.buffer);
}