import ajax from "./ajax";

//http://localhost:3000/web/xlmc
// const BASE_URL = '/api';
const BASE_URL='http://localhost:3000'
//本地服务器
//1.定义基础路线
export const getHomeData = ()=>ajax(BASE_URL+'/web/api/getDepartments');
//添加医师
export const addDoctor = ()=>ajax(BASE_URL+'/web/api/addDoc');
//根据科室和时间查询医师
export const getDocByDay = (s_id,date)=>ajax(BASE_URL+'/web/api/getDocByDay?time='+new Date(),{s_id,date});
//根据id查询医师
export const getDocById = (dID)=>ajax(BASE_URL+'/web/api/getDocById?time='+new Date(),{dID});
//添加预约单
export const addOrder = (pName,pID,pTel,pDocID,treatDate,treatTime,email)=>ajax(BASE_URL+'/web/api/addOrder',
{pName,pID,pTel,pDocID,treatDate,treatTime,email},'post');
export const findOrder = (email,startTime,endTime)=>ajax(BASE_URL+'/web/api/findOrder',
{email,startTime,endTime},'post');
//获取验证码
export const getCode = (email)=>ajax(BASE_URL+'/web/api/getCode',{email},'post');
//登录
export const loginByEmail = (email,code)=>ajax(BASE_URL+'/web/api/loginByEmail',{email,code},'post');
//取消预约
export const cancelOrder = (regNumber,pDocID,treatDate,treatTime)=>ajax(BASE_URL+'/web/api/cancelOrder',{regNumber,pDocID,treatDate,treatTime},'post');