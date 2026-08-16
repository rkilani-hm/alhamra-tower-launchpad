export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      app_settings: {
        Row: {
          id: string
          key: string
          value_ar: string | null
          value_en: string | null
        }
        Insert: {
          id?: string
          key: string
          value_ar?: string | null
          value_en?: string | null
        }
        Update: {
          id?: string
          key?: string
          value_ar?: string | null
          value_en?: string | null
        }
        Relationships: []
      }
      awards: {
        Row: {
          id: string
          sort_order: number
          status: string
          sub_ar: string | null
          sub_en: string | null
          title_ar: string | null
          title_en: string | null
          updated_at: string
          updated_by: string | null
          year: string | null
        }
        Insert: {
          id?: string
          sort_order?: number
          status?: string
          sub_ar?: string | null
          sub_en?: string | null
          title_ar?: string | null
          title_en?: string | null
          updated_at?: string
          updated_by?: string | null
          year?: string | null
        }
        Update: {
          id?: string
          sort_order?: number
          status?: string
          sub_ar?: string | null
          sub_en?: string | null
          title_ar?: string | null
          title_en?: string | null
          updated_at?: string
          updated_by?: string | null
          year?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "awards_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      content_versions: {
        Row: {
          id: string
          note: string | null
          published_at: string
          published_by: string | null
          record_id: string
          snapshot: Json
          table_name: string
        }
        Insert: {
          id?: string
          note?: string | null
          published_at?: string
          published_by?: string | null
          record_id: string
          snapshot: Json
          table_name: string
        }
        Update: {
          id?: string
          note?: string | null
          published_at?: string
          published_by?: string | null
          record_id?: string
          snapshot?: Json
          table_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_versions_published_by_fkey"
            columns: ["published_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      feature_cards: {
        Row: {
          body_ar: string | null
          body_en: string | null
          collection: string
          id: string
          image_caption_ar: string | null
          image_caption_en: string | null
          image_id: string | null
          num: string | null
          sort_order: number
          status: string
          title_ar: string | null
          title_en: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          body_ar?: string | null
          body_en?: string | null
          collection: string
          id?: string
          image_caption_ar?: string | null
          image_caption_en?: string | null
          image_id?: string | null
          num?: string | null
          sort_order?: number
          status?: string
          title_ar?: string | null
          title_en?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          body_ar?: string | null
          body_en?: string | null
          collection?: string
          id?: string
          image_caption_ar?: string | null
          image_caption_en?: string | null
          image_id?: string | null
          num?: string | null
          sort_order?: number
          status?: string
          title_ar?: string | null
          title_en?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feature_cards_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "media_assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feature_cards_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      image_slots: {
        Row: {
          alt_ar: string | null
          alt_en: string | null
          fallback_path: string | null
          media_id: string | null
          slot: string
          status: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          alt_ar?: string | null
          alt_en?: string | null
          fallback_path?: string | null
          media_id?: string | null
          slot: string
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          alt_ar?: string | null
          alt_en?: string | null
          fallback_path?: string | null
          media_id?: string | null
          slot?: string
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "image_slots_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      media_assets: {
        Row: {
          alt_ar: string | null
          alt_en: string | null
          created_at: string
          height: number | null
          id: string
          public_url: string | null
          storage_path: string | null
          uploaded_by: string | null
          width: number | null
        }
        Insert: {
          alt_ar?: string | null
          alt_en?: string | null
          created_at?: string
          height?: number | null
          id?: string
          public_url?: string | null
          storage_path?: string | null
          uploaded_by?: string | null
          width?: number | null
        }
        Update: {
          alt_ar?: string | null
          alt_en?: string | null
          created_at?: string
          height?: number | null
          id?: string
          public_url?: string | null
          storage_path?: string | null
          uploaded_by?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "media_assets_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      page_prose: {
        Row: {
          field_key: string
          field_type: string
          id: string
          page_key: string
          sort_order: number
          status: string
          updated_at: string
          updated_by: string | null
          value_ar: string | null
          value_en: string | null
        }
        Insert: {
          field_key: string
          field_type?: string
          id?: string
          page_key: string
          sort_order?: number
          status?: string
          updated_at?: string
          updated_by?: string | null
          value_ar?: string | null
          value_en?: string | null
        }
        Update: {
          field_key?: string
          field_type?: string
          id?: string
          page_key?: string
          sort_order?: number
          status?: string
          updated_at?: string
          updated_by?: string | null
          value_ar?: string | null
          value_en?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "page_prose_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          role: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          role?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string
        }
        Relationships: []
      }
      section_fields: {
        Row: {
          field_key: string
          field_type: string
          id: string
          section_key: string
          sort_order: number
          status: string
          updated_at: string
          updated_by: string | null
          value_ar: string | null
          value_en: string | null
        }
        Insert: {
          field_key: string
          field_type?: string
          id?: string
          section_key: string
          sort_order?: number
          status?: string
          updated_at?: string
          updated_by?: string | null
          value_ar?: string | null
          value_en?: string | null
        }
        Update: {
          field_key?: string
          field_type?: string
          id?: string
          section_key?: string
          sort_order?: number
          status?: string
          updated_at?: string
          updated_by?: string | null
          value_ar?: string | null
          value_en?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "section_fields_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sections: {
        Row: {
          id: string
          key: string
          status: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          id?: string
          key: string
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          id?: string
          key?: string
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      spec_rows: {
        Row: {
          category_ar: string | null
          category_en: string | null
          id: string
          label_ar: string | null
          label_en: string | null
          sort_order: number
          status: string
          updated_at: string
          updated_by: string | null
          value_ar: string | null
          value_en: string | null
        }
        Insert: {
          category_ar?: string | null
          category_en?: string | null
          id?: string
          label_ar?: string | null
          label_en?: string | null
          sort_order?: number
          status?: string
          updated_at?: string
          updated_by?: string | null
          value_ar?: string | null
          value_en?: string | null
        }
        Update: {
          category_ar?: string | null
          category_en?: string | null
          id?: string
          label_ar?: string | null
          label_en?: string | null
          sort_order?: number
          status?: string
          updated_at?: string
          updated_by?: string | null
          value_ar?: string | null
          value_en?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "spec_rows_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      stat_counters: {
        Row: {
          display_ar: string | null
          display_en: string | null
          end: number | null
          group_key: string
          id: string
          label_ar: string | null
          label_en: string | null
          sort_order: number
          start: number
          stat_key: string
          status: string
          step: number
          sub_ar: string | null
          sub_en: string | null
          unit_ar: string | null
          unit_en: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          display_ar?: string | null
          display_en?: string | null
          end?: number | null
          group_key: string
          id?: string
          label_ar?: string | null
          label_en?: string | null
          sort_order?: number
          start?: number
          stat_key: string
          status?: string
          step?: number
          sub_ar?: string | null
          sub_en?: string | null
          unit_ar?: string | null
          unit_en?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          display_ar?: string | null
          display_en?: string | null
          end?: number | null
          group_key?: string
          id?: string
          label_ar?: string | null
          label_en?: string | null
          sort_order?: number
          start?: number
          stat_key?: string
          status?: string
          step?: number
          sub_ar?: string | null
          sub_en?: string | null
          unit_ar?: string | null
          unit_en?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stat_counters_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      timeline_entries: {
        Row: {
          body_ar: string | null
          body_en: string | null
          collection: string
          id: string
          image_id: string | null
          sort_order: number
          status: string
          title_ar: string | null
          title_en: string | null
          updated_at: string
          updated_by: string | null
          year: string | null
        }
        Insert: {
          body_ar?: string | null
          body_en?: string | null
          collection: string
          id?: string
          image_id?: string | null
          sort_order?: number
          status?: string
          title_ar?: string | null
          title_en?: string | null
          updated_at?: string
          updated_by?: string | null
          year?: string | null
        }
        Update: {
          body_ar?: string | null
          body_en?: string | null
          collection?: string
          id?: string
          image_id?: string | null
          sort_order?: number
          status?: string
          title_ar?: string | null
          title_en?: string | null
          updated_at?: string
          updated_by?: string | null
          year?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "timeline_entries_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "media_assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timeline_entries_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_role: { Args: never; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
