export type User = {
  name: string;
  email: string;
  avatar: string;
  location: string;
  oneLiner: string;
  workingOn: string;
  lookingFor: LookingFor;
  howLong: howLong;
  projectsBuilt: number;
  socials: {
    twitter: string;
    github: string;
    linkedin: string;
  };
};

export enum howLong {
  OneMonth = "One Month Or More",
  Oneyear = "One Year or More",
  twoYears = "Two Years or More",
  threeYears = "Three Years or More",
  fiveYears = "Five Years or More",
  veryLong = "Very Long",
}

export enum LookingFor {
  Job = "Job",
  Internship = "Internship",
  Meet_People = "Meet Crazy People",
}
