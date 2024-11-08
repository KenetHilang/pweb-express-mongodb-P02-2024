export default function formatResponse(
    status: "failed" | "error" | "success",
    message: string,
    
    data: any = null
  ) {
    return {
      status,
      message,
      data,
    };
  }

  export function HealthCheck(
    status: "success" | "failed",
    message: "Hello World",
    date: any = new Date().toDateString()
  ) {
    return {
      status,
      message,
      date,
    };
  }
