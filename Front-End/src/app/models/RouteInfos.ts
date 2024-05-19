export interface RouteInfos {
  starting_point: addressInfo;
  end_point: addressInfo;
  total_distance: number;
  total_route_points: number;
  total_time: any;
}

export interface addressInfo {
  city: string | undefined
  country: string | undefined
  neighborhood: string | undefined
  street: string | undefined
  address: string | undefined
}
