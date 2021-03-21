import { NextSeo } from 'next-seo';
import CustomLink from '@/components/CustomLink';
import { useEffect, useState } from 'react';
import { nrpData } from '@/data/data';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [first, setFirst] = useState(true);
    const [filteredList, setFilteredList] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (first) {
            setFirst(false);
        }
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            const results = nrpData.filter(
                (data) =>
                    data.nrp.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    data.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredList(results);
        }, 50);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    return (
        <>
            <NextSeo />

            <main>
                <section className='bg-dark'>
                    <div className='min-h-screen py-12 text-white layout'>
                        <div className='flex flex-col items-center'>
                            <h1>Enigmatics Finder</h1>
                            <p className='mt-4 mb-8'>
                                By{' '}
                                <CustomLink href='https://theodorusclarence.com'>
                                    Theodorus Clarence
                                </CustomLink>
                            </p>
                        </div>
                        <div className='flex flex-col max-w-lg mx-auto space-y-2'>
                            <label htmlFor='query' className='font-bold'>
                                Search by name, nrp (4 last digits)
                            </label>
                            <input
                                value={searchTerm}
                                onChange={handleSearch}
                                type='text'
                                className='border-white rounded-md bg-dark focus:ring-primary-400 focus:border-primary-400'
                            />
                        </div>
                        <ul className='max-w-lg mx-auto mt-4 divide-y'>
                            {first ? (
                                <h3>Try to search something</h3>
                            ) : (
                                <>
                                    {filteredList.map(({ nrp, name }) => (
                                        <li
                                            keys={nrp}
                                            className='w-full py-3 text-base font-medium'
                                        >
                                            <span className='font-bold text-primary-400'>
                                                {nrp}
                                            </span>{' '}
                                            - {name}
                                        </li>
                                    ))}
                                </>
                            )}
                        </ul>
                    </div>
                </section>
            </main>
        </>
    );
}
