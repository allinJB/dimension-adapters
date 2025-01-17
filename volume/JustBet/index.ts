import { Adapter, FetchResultVolume } from '../../adapters/types';
import { CHAIN } from '../../helpers/chains';

import axios from 'axios';

const getGameVolumes = async () => {
  const { data } = await axios.get(
    'https://web2.just.bet/defillama/games-volumes',
  );
  return data;
};

const fetch = async (): Promise<FetchResultVolume> => {
  const data = await getGameVolumes();

  const totalVolume = data.reduce(
    (acc: any, item: any) => acc + item.volume,
    0,
  );

  return {
    totalVolume: totalVolume.toFixed(2),
    timestamp: Date.now(),
  };
};

const adapter: Adapter = {
  adapter: {
    [CHAIN.ARBITRUM]: {
      fetch: fetch,
      start: async () => 91125690,
      meta: {
        methodology:
          'Each game has a volume, we sum all games volumes to get the total volume',
      },
    },
  },
};

export default adapter;
