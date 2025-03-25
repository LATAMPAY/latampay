import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    // Initialize Supabase client with environment variables
    const supabaseUrl = process.env.SUPABASE_SUPABASE_NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ message: "Missing Supabase environment variables" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Sample users data
    const users = [
      {
        email: "personal@example.com",
        password: "Password123",
        userData: {
          full_name: "Juan Pérez",
          account_type: "personal",
          profile: {
            phone: "+1234567890",
            address: "Calle Principal 123, Ciudad de México",
          },
        },
      },
      {
        email: "pyme@example.com",
        password: "Password123",
        userData: {
          full_name: "María González",
          account_type: "pyme",
          profile: {
            phone: "+1234567891",
            address: "Av. Reforma 456, Guadalajara",
          },
        },
      },
      {
        email: "empresarial@example.com",
        password: "Password123",
        userData: {
          full_name: "Carlos Rodríguez",
          account_type: "empresarial",
          profile: {
            phone: "+1234567892",
            address: "Blvd. Insurgentes 789, Monterrey",
          },
        },
      },
    ]

    // Check if users already exist
    const { data: existingUsers } = await supabase.from("users").select("email")

    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json({ message: "Database already contains users. Skipping seed." }, { status: 200 })
    }

    // Create users and their profiles
    const results = []
    for (const user of users) {
      try {
        // 1. Create auth user
        const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
          email: user.email,
          password: user.password,
          email_confirm: true, // Auto-confirm email
          user_metadata: {
            full_name: user.userData.full_name,
            account_type: user.userData.account_type,
          },
        })

        if (authError) {
          results.push(`Error creating auth user ${user.email}: ${authError.message}`)
          continue
        }

        // 2. Insert user data
        const { error: userError } = await supabase.from("users").insert({
          id: authUser.user.id,
          email: user.email,
          full_name: user.userData.full_name,
          account_type: user.userData.account_type,
        })

        if (userError) {
          results.push(`Error inserting user data for ${user.email}: ${userError.message}`)
          continue
        }

        // 3. Insert profile data
        const { error: profileError } = await supabase.from("profiles").insert({
          user_id: authUser.user.id,
          phone: user.userData.profile.phone,
          address: user.userData.profile.address,
        })

        if (profileError) {
          results.push(`Error inserting profile data for ${user.email}: ${profileError.message}`)
          continue
        }

        results.push(`Successfully created user and profile for: ${user.email}`)
      } catch (error) {
        results.push(`Unexpected error processing user ${user.email}: ${error.message}`)
      }
    }

    return NextResponse.json(
      {
        message: "Database seeding completed",
        details: results,
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ message: `Error in seed process: ${error.message}` }, { status: 500 })
  }
}

