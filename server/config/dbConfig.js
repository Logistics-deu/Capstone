module.exports = 
{
 user : process.env.NODE_ORACLEDB_USER || "CAPSTONE",
 password : process.env.NODE_ORACLEDB_PASSWOR || "1234",
 connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "121.145.133.119/xe" 
}