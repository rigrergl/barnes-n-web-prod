export default function secureLog(log: any) {
  if (process.env.PROD?.toLocaleLowerCase() === "false") {
    console.log(log);
  }
}
