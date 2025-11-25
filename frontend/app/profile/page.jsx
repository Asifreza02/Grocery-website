'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Loader2, Save, User as UserIcon, MapPin, Phone, Mail } from 'lucide-react';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/sign-in');
            return;
        }
        fetchProfile(token);
    }, []);

    const fetchProfile = async (token) => {
        try {
            const response = await fetch('/api/user/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch profile');
            const data = await response.json();
            setUser(data);
            setFormData({
                username: data.username || '',
                email: data.email || '',
                phone: data.phone || '',
                address: data.address || '',
                city: data.city || '',
                state: data.state || '',
                zip: data.zip || ''
            });
        } catch (error) {
            console.error(error);
            toast.error('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Failed to update profile');

            const updatedUser = await response.json();
            setUser(updatedUser);
            toast.success('Profile updated successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin h-8 w-8 text-emerald-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
            >
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden">
                    <div className="md:flex">
                        {/* Sidebar */}
                        <div className="md:w-1/3 bg-emerald-600 p-8 text-white flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                                        <UserIcon size={32} />
                                    </div>
                                    <h1 className="text-2xl font-bold">My Profile</h1>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 opacity-90">
                                        <UserIcon size={18} />
                                        <span className="font-medium">{user?.username}</span>
                                    </div>
                                    <div className="flex items-center gap-3 opacity-90">
                                        <Mail size={18} />
                                        <span className="font-medium">{user?.email}</span>
                                    </div>
                                    {user?.phone && (
                                        <div className="flex items-center gap-3 opacity-90">
                                            <Phone size={18} />
                                            <span className="font-medium">{user.phone}</span>
                                        </div>
                                    )}
                                    {user?.city && (
                                        <div className="flex items-center gap-3 opacity-90">
                                            <MapPin size={18} />
                                            <span className="font-medium">{user.city}, {user.state}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mt-8 pt-8 border-t border-white/20">
                                <p className="text-sm opacity-75">
                                    Manage your personal information and delivery address.
                                </p>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="md:w-2/3 p-8">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Edit Profile</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="username">Username</Label>
                                        <Input
                                            id="username"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="bg-gray-50 dark:bg-zinc-800"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled
                                            className="bg-gray-100 dark:bg-zinc-800 cursor-not-allowed opacity-70"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 98765 43210"
                                            className="bg-gray-50 dark:bg-zinc-800"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <MapPin size={18} className="text-emerald-600" />
                                        Address Details
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="address">Street Address</Label>
                                            <Input
                                                id="address"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                placeholder="123 Main St, Apt 4B"
                                                className="bg-gray-50 dark:bg-zinc-800"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="city">City</Label>
                                                <Input
                                                    id="city"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    className="bg-gray-50 dark:bg-zinc-800"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="state">State</Label>
                                                <Input
                                                    id="state"
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleChange}
                                                    className="bg-gray-50 dark:bg-zinc-800"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="zip">ZIP Code</Label>
                                                <Input
                                                    id="zip"
                                                    name="zip"
                                                    value={formData.zip}
                                                    onChange={handleChange}
                                                    className="bg-gray-50 dark:bg-zinc-800"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button
                                        type="submit"
                                        disabled={saving}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[140px]"
                                    >
                                        {saving ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                Save Changes
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;
