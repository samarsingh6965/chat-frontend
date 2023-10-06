import type { FC } from 'react';
import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FiMoreVertical } from "react-icons/fi"
import classNames from 'classnames';
interface Action {
    id: number;
    name: string;
    click?: any;
}
interface ActionPopProps {
    action: Action[]
    icon: 'FiMoreVertical';
}


const ActionPop: FC<ActionPopProps> = ({ action, icon }) => {
    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className={'text-2xl'}>
                        {icon === 'FiMoreVertical' && <FiMoreVertical />}
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {action?.length > 0 && action?.map(e => (
                                <React.Fragment key={e?.id}>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <p onClick={e.click} className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'px-4 h-10 font-medium cursor-pointer flex items-center')} >
                                                {e?.name}
                                            </p>
                                        )}
                                    </Menu.Item>
                                </React.Fragment>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}

export default ActionPop;
