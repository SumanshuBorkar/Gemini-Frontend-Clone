import React, { useMemo, useRef, useCallback } from 'react';
import AsyncSelect from 'react-select/async';
import debounce from 'lodash.debounce';

export default function CountryCodeSelector({
  value,
  onChange,
  placeholder = 'Search country (e.g., India)…',
  defaultCountries,
}) {
  const abortRef = useRef(null);

  const countryToOptions = (country) => {
    const name = country?.name?.common ?? 'Unknown';
    const root = country?.idd?.root ?? '';
    const suffixes = country?.idd?.suffixes ?? [];
    const flag = country?.flags?.svg || country?.flags?.png || '';

    if (!root || !Array.isArray(suffixes) || suffixes.length === 0) return [];

    return suffixes.map((suf) => {
      const dial = `${root}${suf}`;
      return {
        label: `${name} (${dial})`,
        value: dial,
        meta: { flag, name, dial },
      };
    });
  };

  const fetchCountries = async (input) => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    if (!input?.trim()) return [];

    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(input)}?fields=name,idd,cca2,flags`,
        { signal: controller.signal }
      );
      if (!res.ok) return [];

      const data = await res.json();
      const opts = data.flatMap(countryToOptions);

      const seen = new Set();
      return opts.filter((o) => {
        if (seen.has(o.value)) return false;
        seen.add(o.value);
        return true;
      });
    } catch (err) {
      if (err.name === 'AbortError') return [];
      return [];
    }
  };

  // ✅ Debounced version of fetchCountries
  const loadOptions = useCallback(
    debounce((inputValue, callback) => {
      fetchCountries(inputValue).then(callback);
    }, 400), // 400ms debounce
    []
  );

  const defaultOptions = useMemo(() => {
    return defaultCountries || [
      { label: 'India (+91)', value: '+91' },
      { label: 'United States (+1)', value: '+1' },
      { label: 'United Kingdom (+44)', value: '+44' },
    ];
  }, [defaultCountries]);

  const valueOption = useMemo(() => {
    if (!value) return null;
    const preset = defaultOptions.find((o) => o.value === value);
    return preset ?? { label: value, value };
  }, [value, defaultOptions]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Country Code</label>
      <AsyncSelect
        cacheOptions
        defaultOptions={defaultOptions}
        loadOptions={loadOptions}
        value={valueOption}
        onChange={(opt) => onChange?.(opt ? opt.value : null)}
        placeholder={placeholder}
        isClearable
        noOptionsMessage={() => 'Type a country name…'}
        menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
      />
    </div>
  );
}
