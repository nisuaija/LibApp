﻿// <auto-generated />
using System;
using LibAppApi.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace LibAppApi.Migrations
{
    [DbContext(typeof(BooksContext))]
    [Migration("20240213111348_ReviewForeignKey")]
    partial class ReviewForeignKey
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("LibAppApi.Models.Book", b =>
                {
                    b.Property<string>("finna_ID")
                        .HasColumnType("text");

                    b.Property<string>("ISBN")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("author")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("image")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("pages")
                        .HasColumnType("integer");

                    b.Property<string>("title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("finna_ID");

                    b.ToTable("Books", (string)null);
                });

            modelBuilder.Entity("LibAppApi.Models.Report", b =>
                {
                    b.Property<string>("ID")
                        .HasColumnType("text");

                    b.Property<string>("Info")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Reason")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ReviewID")
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.HasIndex("ReviewID");

                    b.ToTable("Report");
                });

            modelBuilder.Entity("LibAppApi.Models.Review", b =>
                {
                    b.Property<string>("ID")
                        .HasColumnType("text");

                    b.Property<string>("Finna_ID")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsPrivate")
                        .HasColumnType("boolean");

                    b.Property<double>("Score")
                        .HasColumnType("double precision");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("UserID")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.ToTable("Reviews", (string)null);
                });

            modelBuilder.Entity("LibAppApi.Models.SessionToken", b =>
                {
                    b.Property<string>("SessionID")
                        .HasColumnType("text");

                    b.Property<string>("UserID")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("SessionID");

                    b.HasIndex("UserID");

                    b.ToTable("SessionTokens", (string)null);
                });

            modelBuilder.Entity("LibAppApi.Models.User", b =>
                {
                    b.Property<string>("userID")
                        .HasColumnType("text");

                    b.Property<string>("hash")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("isAdmin")
                        .HasColumnType("boolean");

                    b.Property<string>("salt")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("userName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("userID");

                    b.ToTable("Users", (string)null);
                });

            modelBuilder.Entity("LibAppApi.Models.userBook", b =>
                {
                    b.Property<string>("ID")
                        .HasColumnType("text");

                    b.Property<DateTime>("dueDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("endDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("finna_ID")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("isAvailable")
                        .HasColumnType("boolean");

                    b.Property<int>("pagesRead")
                        .HasColumnType("integer");

                    b.Property<string>("reviewID")
                        .HasColumnType("text");

                    b.Property<DateTime>("startDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("status")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("userID")
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.HasIndex("finna_ID");

                    b.HasIndex("reviewID");

                    b.HasIndex("userID");

                    b.ToTable("userBook");
                });

            modelBuilder.Entity("LibAppApi.Models.Report", b =>
                {
                    b.HasOne("LibAppApi.Models.Review", null)
                        .WithMany("Reports")
                        .HasForeignKey("ReviewID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("LibAppApi.Models.SessionToken", b =>
                {
                    b.HasOne("LibAppApi.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("LibAppApi.Models.userBook", b =>
                {
                    b.HasOne("LibAppApi.Models.Book", "book")
                        .WithMany()
                        .HasForeignKey("finna_ID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LibAppApi.Models.Review", "review")
                        .WithMany()
                        .HasForeignKey("reviewID");

                    b.HasOne("LibAppApi.Models.User", null)
                        .WithMany("userBooks")
                        .HasForeignKey("userID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("book");

                    b.Navigation("review");
                });

            modelBuilder.Entity("LibAppApi.Models.Review", b =>
                {
                    b.Navigation("Reports");
                });

            modelBuilder.Entity("LibAppApi.Models.User", b =>
                {
                    b.Navigation("userBooks");
                });
#pragma warning restore 612, 618
        }
    }
}
