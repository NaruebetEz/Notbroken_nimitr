import {
    Skeleton,
    Stack,
} from "@mui/material";

export const SkeletonMainPage = () => {
    return (
        <Stack spacing={2} sx={{ alignItems: 'flex-end' }}>
            <Skeleton variant="rounded" sx={{ width: '126px', height: '40px', borderRadius: '16px' }} />
            <Skeleton variant="rounded" sx={{ width: '100%', height: '60px', borderRadius: '20px' }} />
            <Skeleton variant="rounded" sx={{ width: '100%', height: '60px', borderRadius: '20px' }} />
            <Skeleton variant="rounded" sx={{ width: '100%', height: '60px', borderRadius: '20px' }} />
            <Skeleton variant="rounded" sx={{ width: '100%', height: '60px', borderRadius: '20px' }} />
        </Stack>
    );
};
