export interface Dictionary {
  brand: string;

  nav: {
    home: string;
    about: string;
    services: string;
    contact: string;
    coworking: string;
  };

  hero: {
    title: string;
    phrases: string[];
    rating: {
      line1: string;
      line2: string;
      tagline: string;
    };
  };

  experience: {
    headerTop: string;
    headerBottom: string;
    testimonials: {
      name: string;
      role: string;
      company: string;
      text: string;
      avatar: string;
    }[];
  };

  cases: {
    tudeuna: {
      title: string;
      highlight: string;
      subtitle: string;
      client: string;
      description: string;
    };

    arro: {
      title: string;
      highlight: string;
      subtitle: string;
      client: string;
      description: string;
    };

    lavelada: {
      title: string;
      highlight: string;
      subtitle: string;
      client: string;
      description: string;
    };
  };
  contact: string;
  members: {
    ceo: {
      role: string;
      name: string;
      description: string;
    };
    coofounder: {
      role: string;
      name: string;
      description: string;
    };
    techleader: {
      role: string;
      name: string;
      description: string;
    };
  };
}
