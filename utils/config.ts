import {
    createConfig,
    WagmiProvider,
} from 'wagmi';
import { http } from 'viem';
import { mainnet, polygon } from 'viem/chains';

export const config = createConfig({
    chains: [polygon],
    multiInjectedProviderDiscovery: false,
    transports: {
        [polygon.id]: http(),
    },
});