'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export function MythsFilters({ gods, domains, currentSearch, currentGod, currentDomain }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    router.push(`/myths?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/myths');
  };

  const hasActiveFilters = currentSearch || currentGod || currentDomain;

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search myths by title..."
            defaultValue={currentSearch}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-9"
          />
        </div>

        {/* God Filter */}
        <Select
          value={currentGod || 'all'}
          onValueChange={(value) => updateFilter('god', value)}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by god" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Gods</SelectItem>
            {gods.map((god) => (
              <SelectItem key={god.id} value={god.slug}>
                {god.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Domain Filter */}
        <Select
          value={currentDomain || 'all'}
          onValueChange={(value) => updateFilter('domain', value)}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by domain" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Domains</SelectItem>
            {domains.map((domain) => (
              <SelectItem key={domain} value={domain} className="capitalize">
                {domain}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
