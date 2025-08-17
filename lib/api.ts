const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://clubio.onrender.com';

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
}

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
    // Try to get token from localStorage on initialization
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('authToken');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers && typeof options.headers === 'object'
        ? Object.fromEntries(
            Object.entries(options.headers).filter(
              ([key, value]) => typeof value === 'string'
            )
          )
        : {}),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return { 
        error: error instanceof Error ? error.message : 'An unknown error occurred' 
      };
    }
  }

  // Authentication endpoints
  async login(email: string, password: string, userType: 'PERSON' | 'CLUB') {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    
    const response = await fetch(`${this.baseURL}/auth/login/`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Login failed');
    }

    const data = await response.json();
    this.setToken(data.access_token);
    return data;
  }

  async registerPerson(userData: any, personData: any) {
    // FastAPI endpoint expects two body params: user and person
    return this.request('/auth/register/person/', {
      method: 'POST',
      body: JSON.stringify({ user: userData, person: personData }),
    });
  }

  async registerClub(userData: any, clubData: any) {
    // FastAPI endpoint expects two body params: user and club
    return this.request('/auth/register/club/', {
      method: 'POST',
      body: JSON.stringify({ user: userData, club: clubData }),
    });
  }

  async getCurrentUser() {
    return this.request('/auth/current_user/');
  }

  // Events endpoints
  async getEvents() {
    return this.request('/events/get_event/all/');
  }

  async getEvent(eventId: number) {
    return this.request(`/events/get_event/${eventId}/`);
  }

  async createEvent(eventData: any) {
    return this.request('/events/add_event/', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  async updateEvent(eventId: number, eventData: any) {
    return this.request(`/events/update_event/${eventId}/`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  }

  async deleteEvent(eventId: number) {
    return this.request(`/events/delete_event/${eventId}/`, {
      method: 'DELETE',
    });
  }

  async getClubEvents(clubId: number) {
    return this.request(`/events/get_club_events/?club_id=${clubId}`);
  }

  // Clubs endpoints
  async getAllClubs() {
    return this.request('/clubs/view_all_clubs/');
  }

  // Membership endpoints
  async getClubMembers(clubId: number) {
    return this.request(`/membership/get_all_members/${clubId}/`);
  }

  // Users endpoints
  async getUserProfile() {
    return this.request('/users/my_profile/');
  }

  async updateProfile(personId: number, profileData: any) {
    return this.request(`/users/edit_person/${personId}/`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Applications endpoints
  async applyToEvent(eventId: number, applicationData: any) {
    return this.request(`/applications/apply_for_event/${eventId}/`, {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  }

  async getUserApplications() {
    return this.request('/applications/view_my_applications/');
  }

  async getEventApplications(eventId: number) {
    return this.request(`/applications/get_event_applications/${eventId}/`);
  }

  // Application moderation
  async acceptApplication(appId: number) {
    return this.request(`/applications/accept_application/${appId}/`, { method: 'POST' });
  }

  async rejectApplication(appId: number) {
    return this.request(`/applications/reject_application/${appId}/`, { method: 'POST' });
  }

  // Membership management
  async addMember(email: string) {
    return this.request(`/membership/add_member/?email=${encodeURIComponent(email)}`, { method: 'POST' });
  }

  async removeMember(email: string) {
    return this.request(`/membership/remove_member/?email=${encodeURIComponent(email)}`, { method: 'DELETE' });
  }

  async uploadMembersCSV(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const headers: Record<string, string> = {};
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
    try {
      const res = await fetch(`${this.baseURL}/membership/upload_members_file/`, {
        method: 'POST',
        headers,
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || 'Upload failed');
      }
      const blob = await res.blob();
      return { data: blob as any };
    } catch (e) {
      return { error: e instanceof Error ? e.message : 'Upload failed' };
    }
  }

  // Image upload
  async uploadImage(file: File, type: 'user' | 'club' | 'event') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const headers: Record<string, string> = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}/images/upload/`, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Upload failed');
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return { 
        error: error instanceof Error ? error.message : 'Upload failed' 
      };
    }
  }

  // Profile images
  async addProfileImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    const headers: Record<string, string> = {};
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
    try {
      const res = await fetch(`${this.baseURL}/images/add_profile_image/`, {
        method: 'POST',
        headers,
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Upload failed');
      return { data };
    } catch (e) {
      return { error: e instanceof Error ? e.message : 'Upload failed' };
    }
  }

  async deleteProfileImage() {
    return this.request('/images/delete_profile_image/', { method: 'DELETE' });
  }

  // Event images
  async attachImageToEvent(eventId: number, file: File) {
    const formData = new FormData();
    formData.append('image', file);
    const headers: Record<string, string> = {};
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
    try {
      const res = await fetch(`${this.baseURL}/images/attach_image_to_event/${eventId}/`, {
        method: 'POST',
        headers,
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Attach failed');
      return { data };
    } catch (e) {
      return { error: e instanceof Error ? e.message : 'Attach failed' };
    }
  }

  async deleteEventImage(eventId: number) {
    return this.request(`/images/delete_image_from_event/${eventId}/`, { method: 'DELETE' });
  }
}

export const apiService = new ApiService();
export default apiService;
