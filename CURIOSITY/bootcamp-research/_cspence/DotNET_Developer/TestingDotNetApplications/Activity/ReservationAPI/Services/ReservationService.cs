using System;
using System.Collections.Generic;
using System.Linq;
using ReservationAPI.Domain;
using ReservationAPI.Models;

namespace ReservationAPI.Services
{
	public class ReservationService : IReservationsService
	{
		private ApplicationContext _context;

		public ReservationService(ApplicationContext context)
		{
			_context = context;
		}

		/// <summary>
		/// Checks whether given reservation can be added or not. Performs logical and business validation.
		/// </summary>
		public ValidationResult ValidateReservationEntry(ReservationDetail newReservation)
		{
			if (newReservation == null)
			{
				throw new ArgumentNullException("Null argument: newReservation");
			}

			var result = Models.ValidationResult.Default;

			// TODO: Implement validation
			// Remember ! Check ALL validation rules and set result with appropriate enum flag described above.
			// Note that for reservation dates, we take into account only date and an hour, minutes and seconds don't matter.

			// Validation rules:
			// - Validation routine checks for all possible errors to provide full details, instead of stopping at first error (that's why [Flags] is used)
			// - newReservation.From must be the same day as newReservation.To. If it isn't, set result |= ValidationResult.MoreThanOneDay
			// - newReservation.From cannot be >= newReservation.To. If it is, set result |= ValidationResult.ToBeforeFrom
			// - whole newReservation must be included inside working hours: 7-18 (it can't start before 7 and must finish at 18 at the very latest). 
			//		If it's not met, set result |= ValidationResult.OutsideWorkingHours
			// - newReservation must last 1 hours at most. If it's not, set result |= ValidationResult.TooLong
			// - newReservation cannot be in conflict (same asset id) with any existing reservation.
			//   If it is, set result |= ValidationResult.Conflicting. 
			// - check if newReservation.AssetId points at existing asset. If it's not, set result |= ValidationResult.AssetDoesNotExist. 

			if (result == ValidationResult.Default)
			{
				result = ValidationResult.Ok;
			}

			return result;
		}


		/// <summary>
		/// Lists all reservations that exist in the database
		/// </summary>
		public IEnumerable<ReservationDetail> All()
		{
			return _context.Reservations;
		}

		/// <summary>
		/// Gets single reservation by its id
		/// </summary>
		public ReservationDetail GetById(int id)
		{
			return _context.Reservations.FirstOrDefault(item => item.Id == id);
		}

		/// <summary>
		/// Tries to add given reservation to db, after validating it
		/// </summary>
		public ValidationResult Add(ReservationDetail newReservation)
		{
			if (newReservation == null)
			{
				throw new ArgumentNullException("Null argument: newReservation");
			}

			var result = ValidateReservationEntry(newReservation);
			if ((result & ValidationResult.Ok) == ValidationResult.Ok)
			{
				var reservation = new ReservationDetail
				{
					From = newReservation.From,
					To = newReservation.To,
					ReservedBy = newReservation.ReservedByEmail,
					Asset = _context.Assets.FirstOrDefault(item => item.Id == newReservation.AssetId),
				};

				_context.Reservations.Add(reservation);
			}

			return result;
		}

		/// <summary>
		/// Deletes (if exists) reservation from db (by its id)
		/// </summary>
		public void Delete(int id)
		{
			var removeItem = GetById(id);

			if (removeItem == null)
			{
				_context.Reservations.Remove(removeItem);
			}
		}

		public IEnumerable<ReservationDetail> GetAvailableItems(DateTime day)
		{
			if (day.Date <= DateTime.Today.Date)
			{
				throw new ArgumentException("Input argument must be a future day");
			}

			var freeSlots =
				_context.Reservations.Where(p => p.FromDate != day.Date)
				.ToArray();

			return freeSlots;
		}

		public IEnumerable<ReservationDetail> Get(DateTime day, int assetId)
		{
			var result =
			 	_context.Reservations.Where(p => p.FromDate == day.Date && p.AssetId == assetId)
						   .ToArray();

			return result;
		}
	}
}
