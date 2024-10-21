export interface CreateNewStream{
  source_link: string,
  key: string,
  name: string,
  platformId: number,
  vpsId?: number,
  startTime?: string,
  endTime?: string,
  loop: string,
  download_on: string
}
