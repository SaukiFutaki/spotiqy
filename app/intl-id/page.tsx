import { getSpotifyClient } from "@/lib/action";


export default async function Page() {
const g = await getSpotifyClient()
const data = await g.fetch('/me');

console.log(data);
  return <div>Page</div>;
}
