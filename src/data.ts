export type Mission = {
  firstName: string;
  lastName: string;
  mission: string;
  date: string;
};

export const missionData: Mission[] = Array(30).fill({
  firstName: 'John',
  lastName: 'Doe',
  mission: 'I did a running exercise today',
  date: '2021-08-01',
});
