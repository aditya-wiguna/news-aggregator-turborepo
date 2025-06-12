import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Skeleton } from './ui/skeleton';

export const NewsCardSkeleton: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-1" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardHeader>

      <div className="px-6 pb-3">
        <Skeleton className="w-full h-48 rounded-lg" />
      </div>

      <CardContent className="pt-0">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <Skeleton className="h-4 w-20" />
      </CardContent>
    </Card>
  );
};
