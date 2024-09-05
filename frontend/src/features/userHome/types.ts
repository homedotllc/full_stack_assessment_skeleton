export interface FindHomeByUserIdResponse {
  total: number
  page: number
  pageSize: number
  totalPages: number
  result: HomeInfo[]
}
export interface FindHomeByUserIdRequest {
  userId: number
  pageSize?: number
  page?: number
}
export interface FindUserByHomeIdRequest {
  homeId: number
}

export interface HomeInfo {
  id: number
  street_address: string
  state: string
  zip: string
  sqft: string
  beds: number
  baths: number
  list_price: string
}

export interface AllUsersResponse {
  result: UserInfo[]
}

export interface UserInfo {
  id: number
  username: string
  email: string
}
