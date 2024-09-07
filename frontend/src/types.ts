export interface Home {
  home_id: number;
  street_address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  sqft: number;
  beds: number;
  baths: number;
  list_price: number;
  users?: User[];
}

export interface User {
  user_id: number;
  username: string;
  email: string;
  homes: Home[];
}

export interface Select {
  label: string;
  value: string;
}
