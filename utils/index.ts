export function formatDuration(ms : number) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, "0")}`;
  }
  
  export function formatDate(isoString: string): string {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  }
  
  
  interface Track {
    track: {
      duration_ms: number;
    };
  }

  export function calculateTotalDuration(tracks: Track[]): string {
    const totalMs = tracks.reduce((acc, track) => acc + track.track.duration_ms, 0);
    const hours = Math.floor(totalMs / 3600000);
    const minutes = Math.floor((totalMs % 3600000) / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);
  
    return hours > 0
      ? `${hours} jam ${minutes} menit ${seconds} detik`
      : `${minutes} menit ${seconds} detik`;
  }