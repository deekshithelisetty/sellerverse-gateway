import { useState, useRef, useEffect, useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Settings, CheckCircle2, XCircle, ArrowLeft, X, Package } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { motion, AnimatePresence } from 'motion/react';
import { categories, type Category } from '@/lib/categories';
import { useCategoryPermissions } from '@/contexts/CategoryContext';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  status: 'Active' | 'InActive';
}

const users: User[] = [
  { firstName: 'user', lastName: 'test', email: 'user@tabhi.com', status: 'Active' },
  { firstName: 'user1', lastName: 'test', email: 'user1@tabhi.com', status: 'Active' },
  { firstName: 'user2', lastName: 'test', email: 'user2@tabhi.com', status: 'Active' },
  { firstName: 'user3', lastName: 'test', email: 'user3@tabhi.com', status: 'InActive' },
  { firstName: 'John', lastName: 'Doe', email: 'john.doe@tabhi.com', status: 'Active' },
  { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@tabhi.com', status: 'Active' },
  { firstName: 'Michael', lastName: 'Johnson', email: 'michael.j@tabhi.com', status: 'Active' },
  { firstName: 'Emily', lastName: 'Williams', email: 'emily.w@tabhi.com', status: 'InActive' },
  { firstName: 'David', lastName: 'Brown', email: 'david.brown@tabhi.com', status: 'Active' },
  { firstName: 'Sarah', lastName: 'Davis', email: 'sarah.davis@tabhi.com', status: 'Active' },
  { firstName: 'Robert', lastName: 'Miller', email: 'robert.m@tabhi.com', status: 'Active' },
  { firstName: 'Lisa', lastName: 'Wilson', email: 'lisa.wilson@tabhi.com', status: 'InActive' },
  { firstName: 'James', lastName: 'Moore', email: 'james.moore@tabhi.com', status: 'Active' },
  { firstName: 'Maria', lastName: 'Taylor', email: 'maria.t@tabhi.com', status: 'Active' },
  { firstName: 'William', lastName: 'Anderson', email: 'william.a@tabhi.com', status: 'Active' },
];

export default function CategoryManagement() {
  const { getUserSubcategoryStatus, setUserSubcategoryStatus } = useCategoryPermissions();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  const filteredUsers = users.filter(user => {
    const query = searchQuery.toLowerCase();
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(query) ||
      user.lastName.toLowerCase().includes(query) ||
      fullName.includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  // Autocomplete suggestions (limit to 5 for better UX)
  const autocompleteSuggestions = useMemo(() => {
    if (searchQuery.length === 0) return [];
    const query = searchQuery.toLowerCase();
    // Check if query exactly matches a user's full name or email - if so, don't show suggestions
    const exactMatch = users.some(user => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return fullName === query || user.email.toLowerCase() === query;
    });
    if (exactMatch) return [];
    
    return users
      .filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        return (
          fullName.includes(query) ||
          user.email.toLowerCase().includes(query)
        );
      })
      .slice(0, 5);
  }, [searchQuery]);

  // Close autocomplete when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setHighlightedIndex(-1);
  };

  // Update autocomplete visibility when suggestions change
  useEffect(() => {
    // Don't show autocomplete if query exactly matches a user's full name or email
    const exactMatch = users.some(user => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const query = searchQuery.toLowerCase();
      return fullName === query || user.email.toLowerCase() === query;
    });
    
    setShowAutocomplete(
      searchQuery.length > 0 && 
      autocompleteSuggestions.length > 0 && 
      !exactMatch
    );
  }, [searchQuery, autocompleteSuggestions]);

  const handleSuggestionClick = (user: User) => {
    // Set search query to the full name - this will filter to show this user
    // and the autocomplete won't show again because it's an exact match
    const fullName = `${user.firstName} ${user.lastName}`;
    setSearchQuery(fullName);
    setShowAutocomplete(false);
    setHighlightedIndex(-1);
    // Focus back on input to ensure proper state
    setTimeout(() => {
      searchInputRef.current?.blur();
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showAutocomplete || autocompleteSuggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => 
        prev < autocompleteSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(autocompleteSuggestions[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setShowAutocomplete(false);
      setHighlightedIndex(-1);
    }
  };

  const allFilteredSelected = filteredUsers.length > 0 && filteredUsers.every((_, index) => selectedUsers.has(index));
  const someFilteredSelected = filteredUsers.some((_, index) => selectedUsers.has(index));

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const newSelected = new Set<number>();
      filteredUsers.forEach((_, index) => newSelected.add(index));
      setSelectedUsers(newSelected);
    } else {
      setSelectedUsers(new Set());
    }
  };

  const handleSelectUser = (index: number, checked: boolean) => {
    const newSelected = new Set(selectedUsers);
    if (checked) {
      newSelected.add(index);
    } else {
      newSelected.delete(index);
    }
    setSelectedUsers(newSelected);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleSettingsClick = (index: number) => {
    setSelectedUserIndex(index);
    setSelectedCategory(null);
  };

  const handleBackClick = () => {
    setSelectedUserIndex(null);
    setSelectedCategory(null);
  };

  const toggleSubcategory = (categoryId: string, subcategoryId: string) => {
    if (!selectedUser) return;
    const currentStatus = getUserSubcategoryStatus(selectedUser.email, categoryId, subcategoryId);
    setUserSubcategoryStatus(selectedUser.email, categoryId, subcategoryId, !currentStatus);
  };

  const getSubcategoryStatus = (categoryId: string, subcategoryId: string): boolean => {
    if (!selectedUser) return false;
    return getUserSubcategoryStatus(selectedUser.email, categoryId, subcategoryId);
  };

  const enableAllSubcategories = (categoryId: string) => {
    if (!selectedUser) return;
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;
    
    category.subcategories.forEach(subcategory => {
      setUserSubcategoryStatus(selectedUser.email, categoryId, subcategory.id, true);
    });
  };

  const disableAllSubcategories = (categoryId: string) => {
    if (!selectedUser) return;
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;
    
    category.subcategories.forEach(subcategory => {
      setUserSubcategoryStatus(selectedUser.email, categoryId, subcategory.id, false);
    });
  };

  const areAllSubcategoriesEnabled = (categoryId: string): boolean => {
    const category = categories.find(c => c.id === categoryId);
    if (!category || category.subcategories.length === 0) return false;
    
    return category.subcategories.every(subcategory => 
      getSubcategoryStatus(categoryId, subcategory.id)
    );
  };

  const toggleAllSubcategories = (categoryId: string, enabled: boolean) => {
    if (enabled) {
      enableAllSubcategories(categoryId);
    } else {
      disableAllSubcategories(categoryId);
    }
  };

  const selectedUser = selectedUserIndex !== null ? filteredUsers[selectedUserIndex] : null;

  return (
    <Tabs defaultValue="category-access" className="w-full h-full flex flex-col min-h-0 overflow-hidden">
      <div className="flex-shrink-0 flex items-center justify-between gap-4 mb-0 relative z-10">
        <div>
          <h2 className="text-2xl font-bold mb-0 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #6366f1, #a855f7)' }}>Category Management</h2>
          <p className="text-sm text-muted-foreground">Manage categories and access permissions</p>
        </div>
        <TabsList className="grid grid-cols-2 glass-card border-white/20 flex-shrink-0">
          <TabsTrigger 
            value="category-access" 
            className="data-[state=active]:text-white settings-tab-trigger"
          >
            Category Access
          </TabsTrigger>
          <TabsTrigger 
            value="category-management" 
            className="data-[state=active]:text-white settings-tab-trigger"
          >
            Category Management
          </TabsTrigger>
        </TabsList>
      </div>

        <style>{`
          .settings-tab-trigger[data-state="active"] {
            background: linear-gradient(to right, #6366f1, #a855f7) !important;
          }
          
          .header-3d-effect {
            position: relative;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .header-3d-effect::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.5), transparent);
            border-radius: 8px 8px 0 0;
            pointer-events: none;
          }
          
          .header-3d-effect::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 2px;
            right: 2px;
            height: 4px;
            background: rgba(99, 102, 241, 0.3);
            border-radius: 0 0 8px 8px;
            filter: blur(4px);
            pointer-events: none;
          }
          
          /* Modern Toggle Switch Styles */
          button[role="switch"][data-state="checked"] {
            background: linear-gradient(to right, #6366f1, #a855f7) !important;
            box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4), 0 0 0 2px rgba(99, 102, 241, 0.1);
          }
          
          button[role="switch"][data-state="checked"]:hover {
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.5), 0 0 0 2px rgba(99, 102, 241, 0.2);
          }
          
          button[role="switch"][data-state="unchecked"] {
            background: rgba(156, 163, 175, 0.5) !important;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          
          button[role="switch"][data-state="unchecked"]:hover {
            background: rgba(156, 163, 175, 0.7) !important;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          }
          
          button[role="switch"] span[data-state="checked"] {
            background: white !important;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
        `}</style>

        <TabsContent value="category-access" className="space-y-3 flex-1 flex flex-col min-h-0 mt-4 overflow-hidden">
          <Card className="glass-card border-white/20 h-full flex flex-col overflow-hidden">
            <CardContent className="space-y-4 pt-4 flex flex-col flex-1 min-h-0 pb-4 overflow-hidden">
              {/* User Settings View */}
              {selectedUserIndex !== null && selectedUser ? (
                <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                  {/* Header with Back Button */}
                  <div className="flex items-center justify-between mb-4 flex-shrink-0 pb-4 relative">
                    <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-gray-300/50"></div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleBackClick}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
                      >
                        <ArrowLeft className="h-5 w-5 text-foreground" />
                        <span className="text-sm font-medium">Back to Users</span>
                      </button>
                      <div className="h-6 w-px bg-border"></div>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-white/20">
                          <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-sm font-semibold">
                            {getInitials(selectedUser.firstName, selectedUser.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {selectedUser.firstName} {selectedUser.lastName}
                          </h3>
                          <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {selectedCategory && (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                          <span className="text-sm font-medium text-foreground">Enable All</span>
                          <Switch
                            checked={areAllSubcategoriesEnabled(selectedCategory)}
                            onCheckedChange={(checked) => toggleAllSubcategories(selectedCategory, checked)}
                            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-indigo-500 data-[state=checked]:to-purple-500"
                          />
                        </div>
                      )}
                      <button
                        onClick={handleBackClick}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <X className="h-5 w-5 text-foreground" />
                      </button>
                    </div>
                  </div>

                  {/* Main Content: Categories and Subcategories */}
                  <div className="flex-1 flex gap-0 min-h-0 overflow-hidden relative">
                    {/* Vertical Divider - starts from horizontal divider */}
                    <div className="absolute left-48 -top-4 bottom-0 w-[2px] bg-gray-300/50 z-10"></div>
                    {/* Left Sidebar - Categories */}
                    <div className="w-48 flex-shrink-0 flex flex-col gap-2 overflow-y-auto pr-4">
                      {categories.map((category) => {
                        const Icon = category.icon;
                        const isSelected = selectedCategory === category.id;
                        return (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`flex items-center gap-2 p-2.5 rounded-xl transition-all duration-200 ${
                              isSelected
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                                : 'bg-white/10 hover:bg-white/20 text-foreground'
                            }`}
                          >
                            <div className={`p-1.5 rounded-full ${
                              isSelected ? 'bg-white/20' : 'bg-gradient-to-br from-indigo-500 to-purple-500'
                            }`}>
                              <Icon className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-medium text-sm">{category.name}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Right Side - Subcategories */}
                    <div className="flex-1 flex flex-col min-h-0 overflow-hidden pl-4">
                      {selectedCategory ? (
                        <div className="flex-1 overflow-y-auto">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                            {categories.find(c => c.id === selectedCategory)?.subcategories.map((subcategory) => {
                              const isEnabled = getSubcategoryStatus(selectedCategory, subcategory.id);
                              return (
                                <div
                                  key={subcategory.id}
                                  className="flex items-center justify-between p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/10 gap-3"
                                >
                                  <span className="text-sm font-medium text-foreground flex-1">{subcategory.name}</span>
                                  <Switch
                                    checked={isEnabled}
                                    onCheckedChange={() => toggleSubcategory(selectedCategory, subcategory.id)}
                                    className="flex-shrink-0 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-indigo-500 data-[state=checked]:to-purple-500 data-[state=unchecked]:bg-gray-400/50 hover:data-[state=unchecked]:bg-gray-400/70 transition-all duration-200 shadow-md hover:shadow-lg"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 flex items-center justify-center">
                          <div className="text-center">
                            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                            <p className="text-muted-foreground">Select a category to view subcategories</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <>
              {/* Search Box */}
              <div className="flex justify-center flex-shrink-0 relative z-50">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                  <Input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => {
                      if (searchQuery.length > 0 && autocompleteSuggestions.length > 0) {
                        setShowAutocomplete(true);
                      }
                    }}
                    onKeyDown={handleKeyDown}
                    className="pl-10 border-2 border-indigo-500 focus:border-indigo-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-xl bg-white/40 backdrop-blur-sm"
                    style={{ borderColor: 'rgb(99, 102, 241)' }}
                  />
                  {/* Autocomplete Dropdown */}
                  {showAutocomplete && autocompleteSuggestions.length > 0 && (
                    <div
                      ref={autocompleteRef}
                      className="absolute w-full mt-1 bg-white/95 border border-white/30 rounded-lg shadow-xl max-h-60 overflow-y-auto backdrop-blur-sm"
                      style={{ position: 'absolute', top: '100%', zIndex: 9999 }}
                    >
                      {autocompleteSuggestions.map((user, index) => (
                        <div
                          key={`${user.email}-${index}`}
                          onClick={() => handleSuggestionClick(user)}
                          className={`px-4 py-3 cursor-pointer transition-all duration-200 ${
                            index === highlightedIndex
                              ? 'bg-indigo-500/30 border-l-2 border-indigo-400'
                              : 'hover:bg-indigo-500/20 hover:border-l-2 hover:border-indigo-400'
                          } ${index !== autocompleteSuggestions.length - 1 ? 'border-b border-white/5' : ''}`}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 border border-white/20">
                              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-xs font-semibold">
                                {getInitials(user.firstName, user.lastName)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-foreground truncate">
                                {user.firstName} {user.lastName}
                              </div>
                              <div className="text-xs text-muted-foreground truncate">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Users List */}
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                {/* Fixed Header */}
                <div className="flex-shrink-0 sticky top-0 z-30">
                  <div 
                    className="grid grid-cols-12 gap-3 px-4 py-2.5 text-xs font-semibold text-white border rounded-lg header-3d-effect"
                    style={{ 
                      backgroundImage: 'linear-gradient(to right, #6366f1, #a855f7)',
                      boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4), 0 4px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      transform: 'perspective(1000px) rotateX(0deg)',
                      position: 'relative'
                    }}
                  >
                    {/* 3D Top Highlight */}
                    <div 
                      className="absolute inset-0 rounded-lg pointer-events-none z-0"
                      style={{
                        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.4)',
                        borderRadius: 'inherit'
                      }}
                    ></div>
                    <div className="col-span-1 flex items-center relative z-10">
                      <Checkbox
                        checked={allFilteredSelected}
                        onCheckedChange={handleSelectAll}
                        className="border-white data-[state=checked]:border-transparent"
                        style={{
                          borderColor: 'white',
                          ...(allFilteredSelected && {
                            backgroundImage: 'linear-gradient(to right, #6366f1, #a855f7)',
                            borderColor: 'transparent'
                          })
                        }}
                      />
                    </div>
                    <div className="col-span-1 relative z-10"></div>
                    <div className="col-span-2 relative z-10">First Name</div>
                    <div className="col-span-2 relative z-10">Last Name</div>
                    <div className="col-span-3 relative z-10">Email</div>
                    <div className="col-span-1 relative z-10">Status</div>
                    <div className="col-span-1 relative z-10"></div>
                  </div>
                </div>
                
                {/* Scrollable User List */}
                <div className="flex-1 overflow-y-auto min-h-0 space-y-1 mt-1 pr-1 user-list-container" style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(99, 102, 241, 0.5) transparent'
                }}>
                  <style>{`
                    .user-list-container::-webkit-scrollbar {
                      width: 8px;
                    }
                    .user-list-container::-webkit-scrollbar-track {
                      background: transparent;
                    }
                    .user-list-container::-webkit-scrollbar-thumb {
                      background-color: rgba(99, 102, 241, 0.5);
                      border-radius: 4px;
                    }
                    .user-list-container::-webkit-scrollbar-thumb:hover {
                      background-color: rgba(99, 102, 241, 0.7);
                    }
                  `}</style>
                   <div>
                     {filteredUsers.map((user, index) => (
                   <div
                     key={`${user.email}-${index}`}
                     className="grid grid-cols-12 gap-3 items-center px-4 py-2.5 rounded-lg hover:bg-indigo-500/15 hover:border-l-4 hover:border-indigo-400 transition-all duration-200 border-b border-white/5 last:border-b-0"
                   >
                    {/* Checkbox */}
                    <div className="col-span-1 flex items-center">
                      <Checkbox
                        checked={selectedUsers.has(index)}
                        onCheckedChange={(checked) => handleSelectUser(index, checked as boolean)}
                        className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
                      />
                    </div>
                    
                    {/* Profile Icon */}
                    <div className="col-span-1">
                      <Avatar className="h-9 w-9 border-2 border-white/20">
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-sm font-semibold">
                          {getInitials(user.firstName, user.lastName)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    
                    {/* First Name */}
                    <div className="col-span-2 text-sm font-medium text-foreground">
                      {user.firstName}
                    </div>
                    
                    {/* Last Name */}
                    <div className="col-span-2 text-sm font-medium text-foreground">
                      {user.lastName}
                    </div>
                    
                    {/* Email */}
                    <div className="col-span-3 text-sm text-muted-foreground truncate">
                      {user.email}
                    </div>
                    
                    {/* Status */}
                    <div className="col-span-1 flex items-center">
                      {user.status === 'Active' ? (
                        <div className="flex items-center gap-1.5 text-green-500">
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="text-xs font-medium">Active</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-red-500">
                          <XCircle className="h-4 w-4" />
                          <span className="text-xs font-medium">InActive</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Settings Icon */}
                    <div className="col-span-1 flex justify-end">
                      <button 
                        onClick={() => handleSettingsClick(index)}
                        className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <Settings className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      </button>
                    </div>
                   </div>
                     ))}
                   </div>
                </div>
              </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="category-management" className="space-y-4">
          <Card className="glass-card border-white/20">
            <CardHeader>
              <CardTitle className="text-lg bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #6366f1, #a855f7)' }}>Category Management</CardTitle>
              <CardDescription>Create, edit, and manage categories</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Category management content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
    </Tabs>
  );
}

