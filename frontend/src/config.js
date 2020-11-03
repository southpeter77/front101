// export const apiUrl = `http://localhost:8000/api`

module.exports ={
    apiUrl:
        process.env.NODE_ENV === "development" 
        ? "http://localhost:8000/api"
        : "https://athlete101.herokuapp.com/api"
}