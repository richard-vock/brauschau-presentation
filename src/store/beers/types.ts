interface Beer {
  name: string;
  style: string;
  gravity: string;
  abv: string;
  ibu: string;
  description: string;
  recipe: string;
  untappd: string;
}

type Actions = {
  load: () => void;
};

export type { Beer, Actions };
