export interface ProfileState {
  currentUser: ProfileModel[];
  loading?: boolean;
  successStatus?: boolean;
  errorStatus?: boolean;
}

export interface ProfileModel {
  genre: string;
}
