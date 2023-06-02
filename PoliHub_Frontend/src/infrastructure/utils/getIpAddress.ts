export function getIpAddress(): string {
    // Load the base URL from the environment variable
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

    // Use the URL constructor to parse the URL
    const url = new URL(baseUrl as string);

    // Return the hostname, which will be the IP address in this case
    return url.hostname;
}