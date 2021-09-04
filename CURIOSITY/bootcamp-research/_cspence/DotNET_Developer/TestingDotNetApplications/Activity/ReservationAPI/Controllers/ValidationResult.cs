using System;

namespace ReservationAPI.Models
{
	/// <summary>
	/// Validation result for flagging entries depending on multiple validation reasons (combined).
	/// </summary>
	[Flags]
	public enum ValidationResult
	{
		Default = 0,
		MoreThanOneDay = 1,
		ToBeforeFrom = 2,
		OutsideWorkingHours = 4,
		TooLong = 8,
		Conflicting = 16,
		AssetDoesNotExist = 32,

		/// <summary>
		/// Reserved successfully.
		/// </summary>
		Ok = 64
	}
}