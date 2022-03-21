import ajax from "./ajax";

//http://localhost:3000/web/xlmc
// const BASE_URL = '/api';
const BASE_URL='http://10.25.6.122:3000'
//本地服务器
//1.定义基础路线
export const getHomeData = ()=>ajax(BASE_URL+'/web/api/departmentList');
//添加医师
export const addDoctor = ()=>ajax(BASE_URL+'/web/api/addDoc');
//根据科室和时间查询医师
export const getDocByDay = (s_id,date)=>ajax(BASE_URL+'/web/api/getDocByDay?time='+new Date(),{s_id,date});
//根据id查询医师
export const getDocById = (dID)=>ajax(BASE_URL+'/web/api/getDocById?time='+new Date(),{dID});
//添加预约单
export const addOrder = (pName,pID,pTel,pDocID,treatDate,treatTime)=>ajax(BASE_URL+'/web/api/addOrder',
{pName,pID,pTel,pDocID,treatDate,treatTime},'post');
export const findOrder = (pName,pID)=>ajax(BASE_URL+'/web/api/findOrder',
{pName,pID},'post');