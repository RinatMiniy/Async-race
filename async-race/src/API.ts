const garage = 'http://127.0.0.1:3000/garage';
const engine = 'http://127.0.0.1:3000/engine';
const winners = 'http://127.0.0.1:3000/winners';

export const getCar = async (id:number) => (await fetch(`${garage}/${id}`)).json();

export const getCars = async (page:number, limit?:number) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);

  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
};

export const DeleteCar = async (id:number) => (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();

export const UpdateCar = async (id:number, el:string) => (
  await fetch(`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(el),
    headers: {
      'Content-Type': 'application/json',
    },
  })).json();

export const startEngine = async (id:number) => (await fetch(`${engine}?id=${id}&status=started`)).json();

export const stopEngine = async (id:number) => (await fetch(`${engine}?id=${id}&status=stopped`)).json();

export const driveStatus = async (id:number) => {
  const response = await fetch(`${engine}?id=${id}&status=drive`).catch();

  if (response.status !== 200) {
    throw new Error();
  }

  return { ...(await response.json()) };
};

export const getWinners = async (page:number) => {
  const response = await fetch(`${'http://127.0.0.1:3000/winners'}?_page${page}&_limit=${10}`);
  const items = await response.json();

  return {
    items: await response.json(),
  };
};
