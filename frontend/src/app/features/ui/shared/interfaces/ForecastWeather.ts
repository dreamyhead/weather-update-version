export interface ForecastWeather {
  cod: string;
  message: number;
  cnt: number;
  list: [
    {
      dt: number;
      main: {
        temp: number;
        temp_max: number;
        temp_min: number;
        feels_like: number;
        humidity: number;
        pressure: number;
        temp_kf: number;
        sea_level: number;
        grnd_level: number;
      };
      wind: {
        speed: number;
        deg: number;
        gust: number
      };
      clouds: {
        all: number;
      };
      visibility: number;
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
        }
      ];
      pop: number;
      sys: {
        pod: string;
      };
    }
  ]
}