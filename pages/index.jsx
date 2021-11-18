import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { HiClipboard, HiEye, HiUser } from 'react-icons/hi';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { nrpData } from '@/data/data';

import CustomLink from '@/components/CustomLink';
import UnstyledLink from '@/components/UnstyledLink';
import Seo from '@/components/Seo';

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
            <Seo />
            <div>
                <Toaster
                    reverseOrder={false}
                    // toastOptions={{
                    //     style: {
                    //         borderRadius: '8px',
                    //         background: '#333',
                    //         color: '#fff',
                    //     },
                    // }}
                />
            </div>
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
                                    {filteredList.map(
                                        ({ nrp, name, image }) => (
                                            <li
                                                keys={nrp}
                                                className='flex items-center w-full py-3'
                                            >
                                                <div className='w-full py-3 text-base font-medium'>
                                                    <span className='font-bold text-primary-400'>
                                                        {nrp}
                                                    </span>{' '}
                                                    - {name}
                                                </div>
                                                <div className='flex'>
                                                    {image && (
                                                        <UnstyledLink
                                                            href={image}
                                                            className='p-1 rounded-full focus:outline-none focus:ring focus:ring-primary-400 hover:text-primary-400'
                                                        >
                                                            <HiEye className='text-lg' />
                                                        </UnstyledLink>
                                                    )}
                                                    <CopyToClipboard
                                                        text={appendNrp(nrp)}
                                                        onCopy={() =>
                                                            toast.success(
                                                                'NRP Copied to clipboard'
                                                            )
                                                        }
                                                    >
                                                        <button className='p-1 rounded-full focus:outline-none focus:ring focus:ring-primary-400 hover:text-primary-400'>
                                                            <HiClipboard className='text-lg' />
                                                        </button>
                                                    </CopyToClipboard>
                                                    <CopyToClipboard
                                                        text={name}
                                                        onCopy={() =>
                                                            toast.success(
                                                                'Name Copied to clipboard'
                                                            )
                                                        }
                                                    >
                                                        <button className='p-1 rounded-full focus:outline-none focus:ring focus:ring-primary-400 hover:text-primary-400'>
                                                            <HiUser className='text-lg' />
                                                        </button>
                                                    </CopyToClipboard>
                                                </div>
                                            </li>
                                        )
                                    )}
                                </>
                            )}
                        </ul>
                    </div>
                </section>
            </main>
        </>
    );
}

function appendNrp(nrp) {
    if (nrp[0] === '2') return '0511194' + nrp;
    else return '0511194000' + nrp;
}
