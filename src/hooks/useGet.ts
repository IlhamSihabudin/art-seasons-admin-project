import { API } from "@/lib/API"
import { useQuery } from "@tanstack/react-query"

export const useGet = <T>(key: string, url: string) => {
    return useQuery<T>({
        queryKey: [key],
        queryFn: async () => {
            const response = await API.get<T>(url);
            return response
        }
    })
}