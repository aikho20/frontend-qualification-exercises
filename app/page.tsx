'use client'
import {
    useGetMemberNameRecommendationMutation,
    useGetMemberMutation,
} from '@/store/action/memberAction'
import { use, useCallback, useEffect, useMemo, useState } from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import {
    CheckCircledIcon,
    CheckIcon,
    ChevronDownIcon,
    CircleBackslashIcon,
    DotFilledIcon,
    InfoCircledIcon,
} from '@radix-ui/react-icons'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { useDispatch, useSelector } from 'react-redux'
import { setName } from '@/store/reducers/memberReducer'
import useHandleParams from '@/hooks/useHandleParams'

export default function Home() {
    const { handleParams, params } = useHandleParams()
    const dispatch = useDispatch()
    const { member }: any = useSelector((state) => state)
    const [open, setOpen] = useState(false)
    const [getMemeber, { data, isLoading }] = useGetMemberMutation()

    const [
        getMemberNameRecommendation,
        { data: nameReccomendation, isLoading: isFetchingNameReccomendation },
    ] = useGetMemberNameRecommendationMutation()

    useEffect(() => {
        handleMemberRecords({ first: 20, filter: {} })
    }, [])

    const handleMemberRecords = useCallback(
        async (config: any) => {
            const final = await handleParams({ ...config })
            await getMemeber({ ...final })
        },
        [member.listOfName]
    )

    const members = useMemo(
        () => (isLoading ? Array(20).fill({}) : data?.members?.edges),
        [isLoading, data?.members?.edges]
    )

    const handleNameSearchRecommendation = async (search: string) => {
        await getMemberNameRecommendation({ search })
    }

    const handleStatusVariant = (status: string) => {
        if (status === 'ACTIVE') {
            return (
                <Badge variant={'active'}>
                    <CheckCircledIcon className='pl-2 pr-1 h-7 w-7' />
                    {status}
                </Badge>
            )
        }
        if (status === 'BLACKLISTED') {
            return (
                <Badge variant={'blacklisted'}>
                    <InfoCircledIcon className='pl-2 pr-1 h-7 w-7' />
                    {status}
                </Badge>
            )
        }
        if (status === 'DISABLED') {
            return (
                <Badge variant={'disabled'}>
                    <CircleBackslashIcon className='pl-2 pr-1 h-7 w-7' />
                    {status}
                </Badge>
            )
        }
    }

    const handleBadgeVariant = (status: string) => {
        if (status === 'UNVERIFIED') return 'unverified'
        if (status === 'PENDING') return 'pending'
        else return 'verified'
    }

    return (
        <div className='p-5'>
            <p className='text-3xl font-semibold text-white'>Members</p>
            <p className='text-md text-[#A3A3A3] py-4'>View your members here</p>
            <div className='flex flex-row items-center justify-start p-3 space-x-4 bg-[#0B1D26] border border-muted/10'>
                <p className='text-lg text-[#A3A3A3]'>Filter</p>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            role='combobox'
                            aria-expanded={open}
                            className='w-[200px] justify-between'
                        >
                            Name
                            <ChevronDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-[200px] p-2 bg-[#0A1117]'>
                        <Input
                            onChange={(e) => handleNameSearchRecommendation(e.currentTarget.value)}
                        />

                        {isFetchingNameReccomendation ? (
                            <p className='text-sm text-white p-3'>Loading...</p>
                        ) : (
                            <div>
                                {nameReccomendation?.membersByName?.map((items: any) => {
                                    return (
                                        <div className='flex flex-row items-center justify-start'>
                                            <Checkbox
                                                id={items?.id}
                                                key={items?.id}
                                                onCheckedChange={async (e) => {
                                                    if (e) {
                                                        await dispatch(
                                                            setName([
                                                                ...member?.listOfName,
                                                                { name: items?.name },
                                                            ])
                                                        )
                                                    } else {
                                                        await dispatch(
                                                            setName(
                                                                member?.listOfName.filter(
                                                                    (x: any) =>
                                                                        x.name !== items?.name
                                                                )
                                                            )
                                                        )
                                                    }
                                                    let finalArray = member?.listOfName.map(
                                                        function (obj: any) {
                                                            return obj.name
                                                        }
                                                    )
                                                    handleMemberRecords({
                                                        first: 20,
                                                        filter: {
                                                            name: {
                                                                in: finalArray,
                                                            },
                                                        },
                                                    })
                                                }}
                                                checked={member.listOfName.some(
                                                    (x: any) => x?.name === items?.name
                                                )}
                                            />
                                            <p className='text-white p-2 text-sm'>{items?.name}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </PopoverContent>
                </Popover>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[100px]'>Name</TableHead>
                        <TableHead>Verification Status</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead>Email Address</TableHead>
                        <TableHead>Mobile Number</TableHead>
                        <TableHead>Domain</TableHead>
                        <TableHead>Date Registered</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {members?.map(
                        (
                            edge: {
                                node: {
                                    name: string
                                    verificationStatus: string
                                    balance: number
                                    emailAddress: string
                                    mobileNumber: string
                                    domain: string
                                    dateTimeCreated: string
                                    status: string
                                    wallet: { balance: number }
                                }
                            },
                            index: number
                        ) => (
                            <>
                                {isLoading ? (
                                    <>
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Skeleton className='w-[100px] h-[20px] rounded-full' />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className='w-[100px] h-[20px] rounded-full' />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className='w-[100px] h-[20px] rounded-full' />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className='w-[100px] h-[20px] rounded-full' />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className='w-[100px] h-[20px] rounded-full' />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className='w-[100px] h-[20px] rounded-full' />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className='w-[100px] h-[20px] rounded-full' />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className='w-[100px] h-[20px] rounded-full' />
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ) : (
                                    <TableRow key={index}>
                                        <TableCell className='font-sm text-[#FBBD2C]'>
                                            {edge?.node?.name || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={handleBadgeVariant(
                                                    edge?.node?.verificationStatus
                                                )}
                                            >
                                                <DotFilledIcon className='p-0 h-6 w-6' />
                                                {edge?.node?.verificationStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className='font-sm text-[#667085]'>
                                            {edge?.node?.wallet?.balance || 'N/A'}
                                        </TableCell>
                                        <TableCell className='font-sm text-[#667085]'>
                                            {edge?.node?.emailAddress || 'N/A'}{' '}
                                        </TableCell>
                                        <TableCell className='font-sm text-[#667085]'>
                                            {edge?.node?.mobileNumber || 'N/A'}
                                        </TableCell>
                                        <TableCell className='font-sm text-[#667085]'>
                                            {edge?.node?.domain || 'N/A'}
                                        </TableCell>
                                        <TableCell className='font-sm text-[#667085]'>
                                            {edge?.node?.dateTimeCreated || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            {handleStatusVariant(edge?.node?.status)}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        )
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
