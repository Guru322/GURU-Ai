type Music = {
  external_ids: {
    isrc: string;
    upc: string;
  };
  sample_begin_time_offset_ms: string;
  label: string;
  play_offset_ms: number;
  artists: {
    name: string;
  }[];
  release_date: string;
  title: string;
  db_end_time_offset_ms: string;
  duration_ms: number;
  album: {
    name: string;
  };
  acrid: string;
  result_from: number;
  db_begin_time_offset_ms: string;
  score: number;
};
type ACRCloudResponse = {
  status: {
    msg: string;
    code: number;
    version: string;
  };
  metadata: {
    played_duration: number;
    music: Music[];
    timestamp_utc: string;
  };
  result_type: number;
  sample_end_time_offset_ms: string;
};
